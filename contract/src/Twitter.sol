//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Twitter {
    address owner;

    mapping(address => User) accounts;
    mapping(address => bool) isLogged;
    mapping(address => Twitt[]) twitts;

    uint usersCount = 0;
    
    struct User {
        address login;
        string password;
        string username;
        string avatar;
    }

    struct Twitt {
        User author;
        string text;
        uint likes;
        uint createdTime;
    }

    modifier onlyLogged() {
        require(isLogged[msg.sender], "You must login in your account");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only for owner");
        _;
    }

    constructor(){
        owner = msg.sender;
    }

    function Registration(string memory _username, string memory _password) public {
        require(accounts[msg.sender].login == address(0), "Account is already registered");

        accounts[msg.sender] = User({
            login: msg.sender,
            password: _password,
            username: _username,
            avatar: ""


        });

        usersCount++;
    }

    function Login(string memory _password) public {
        require(accounts[msg.sender].login != address(0), "You haven`t account");
        require(keccak256(bytes(accounts[msg.sender].password)) == keccak256(bytes(_password)), "Wrong password");

        isLogged[msg.sender] = true;
    }

    function Logout() public onlyLogged{
        isLogged[msg.sender] = false;
    }

    function GetUser(address _user) public view returns(User memory) {
        return accounts[_user];
    }

    function AddTwitt(string memory _text) public onlyLogged{
        User memory _user = GetUser(msg.sender);

        twitts[msg.sender].push(Twitt({
            author: _user,
            text: _text,
            likes: 0,
            createdTime: block.timestamp
        }));
    }

    function UserTwitts(address _user) external view onlyLogged returns(Twitt[] memory){
        return twitts[_user];
    
    }

    function CheckRegistration(address _user) external view returns(bool) {
        return accounts[_user].login != address(0);
    
    }

    function UpdateUser(string memory _avatar) public {
        User storage _user = accounts[msg.sender];

        _user.avatar = _avatar;
    }


}
