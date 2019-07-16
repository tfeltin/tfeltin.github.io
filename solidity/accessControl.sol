pragma solidity >=0.4.2;

contract AccessControl {

    // Record of a user's data (ETH address => fileID)
    mapping(address => bytes32[]) private myData;
    // Record of file IDs and their associated content owner (the users) (file ID => ETH address)
    mapping(bytes32 => address) private ownership;
    // Record of file IDs and who can access the data (file ID => ETH address => bool)
    mapping(bytes32 => mapping(address => bool)) private canAccess;
    // Record of token expiration times (token => time)
    mapping(bytes32 => uint256) private expiration;

    // IPFS address of map from fileIDs to IPFS addresses
    string public mapAddress;

    function setMapAddress(string memory _mapAddress) public{
        mapAddress = _mapAddress;
    }

    // ------------ ACCESS CONTROL ------------

    // Function called by user to add its own data
    function userAddData(bytes32 _fileID, string memory _mapAddress) public {
        ownership[_fileID] = msg.sender;
        canAccess[_fileID][msg.sender] = true;
        myData[msg.sender].push(_fileID);
        mapAddress = _mapAddress;
    }

    // Function called by service provider to add user data
    function spAddData(bytes32 _fileID, address _userAddress, string memory _mapAddress) public {
        ownership[_fileID] = _userAddress;
        canAccess[_fileID][msg.sender] = true;
        canAccess[_fileID][_userAddress] = true;
        myData[_userAddress].push(_fileID);
        mapAddress = _mapAddress;
    }

    // User grants access to its data
    function grantAccess(bytes32 _fileID, address _thirdParty) public {
        require(msg.sender == ownership[_fileID]);
        canAccess[_fileID][_thirdParty] = true;
    }

    // User revokes access to its data
    function revokeAccess(bytes32 _fileID, address thirdParty) public {
        require(msg.sender == ownership[_fileID]);
        canAccess[_fileID][thirdParty] = false;
    }

    // ------------- ACCESS TOKENS -------------

    // Pseudo random number genrator
    function random(bytes32 _fileID) internal view returns (bytes32) {
        return keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender, _fileID));
    }

    // Generate access token to a specified file
    function getToken(bytes32 _fileID) public returns(bytes32){
        if (canAccess[_fileID][msg.sender]){
            bytes32 token = random(_fileID);
            expiration[token] = block.timestamp + 30; // tokens last 30 seconds
            return token;
        }
    }

    // Check validity of token
    function isValidToken(bytes32 _token) public view returns(bool){
        return (block.timestamp < expiration[_token]);
    }

    // ----------------- VIEW -----------------

    // User asks for a view of all its data in the system
    function getMyData() public view returns (bytes32[] memory){
        return myData[msg.sender];
    }

    // Get user's data
    function getUserData(address _userAddress) public view returns (bytes32[] memory){
        return myData[_userAddress];
    }

}
