pragma solidity >=0.4.2;

contract AccessControl {

    // Record of a user's data (ETH address => ipfs addresses)
    mapping(address => string) private myData;
    // Record of ipfs addresses and their associated content owner (the users) (ipfs address => ETH address)
    mapping(string => address) private ownership;
    // Record of ipfs addresses and who can access the data (ipfs address => ETH address => bool)
    mapping(string => mapping(address => bool)) private canAccess;

    // Internal function for string concatenation
    function strConcat(string memory _a, string memory _b) internal pure returns (string memory){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        string memory ab = new string(_ba.length + _bb.length);
        bytes memory bab = bytes(ab);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) bab[k++] = _ba[i];
        for (uint i = 0; i < _bb.length; i++) bab[k++] = _bb[i];
        return string(bab);
    }

    // Function called by user to add its own data
    function userAddData(string memory _ipfsAddress) public {
        ownership[_ipfsAddress] = msg.sender;
        canAccess[_ipfsAddress][msg.sender] = true;
        myData[msg.sender] = strConcat(myData[msg.sender], _ipfsAddress);
    }

    // Function called by service provider to add user data
    function spAddData(string memory _ipfsAddress, address userAddress) public {
        ownership[_ipfsAddress] = userAddress;
        canAccess[_ipfsAddress][msg.sender] = true;
        canAccess[_ipfsAddress][userAddress] = true;
        myData[userAddress] = strConcat(myData[userAddress], _ipfsAddress);
    }

    // Check whether the sender can access the data at a certain address
    function checkAccess(string memory _ipfsAddress) public view returns(bool){
        return canAccess[_ipfsAddress][msg.sender];
    }

    // User grants access to its data
    function grantAccess(string memory _ipfsAddress, address thirdParty) public {
        require(msg.sender == ownership[_ipfsAddress]);
        canAccess[_ipfsAddress][thirdParty] = true;
    }

    // User revokes access to its data
    function revokeAccess(string memory _ipfsAddress, address thirdParty) public {
        require(msg.sender == ownership[_ipfsAddress]);
        canAccess[_ipfsAddress][thirdParty] = false;
    }

    // User asks for a view of all its data in the system
    function getMyData() public view returns (string memory){
        return myData[msg.sender];
    }

}
