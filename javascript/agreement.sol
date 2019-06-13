pragma solidity >=0.4.22 <0.6.0;
contract Agreement {

    address public user;
    address public serviceProvider;
    mapping (bytes32=>bool) public policies;


    constructor(address _passedSP, bytes32 _passedPolicy) public {
        user = msg.sender;
        policies[_passedPolicy] = true;
        serviceProvider = _passedSP;
    }

    function addPolicy(bytes32 _passedPolicy) public{
        require(msg.sender == user);
        policies[_passedPolicy] = true;
    }

    function removePolicy(bytes32 _passedPolicy) public{
        require(msg.sender == user);
        policies[_passedPolicy] = false;
    }

}
