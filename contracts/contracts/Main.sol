// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Student.sol";
import "./Achievement.sol";
import "./Project.sol";
import "./Verifier.sol";

contract Main {
    
    mapping(address => Student) private students;
    mapping(uint => Project) private projects; 
    mapping(uint => Achievement) private achievements; 
    
    mapping(uint => address) private achievementsStudents;
    mapping(uint => mapping(address => Achievement)) private projectStudentsAchievements; 
    mapping(uint => mapping(address => Student)) private projectStudents;
    mapping(address => Project[]) private studentProjects;
    mapping(uint => mapping(address => Verifier)) private projectVerifiers;

    uint private projectCounter = 0;
    uint private achievementCounter = 0;
    
    constructor() {}

    modifier onlyOwner(uint projectId) {
        Project memory tempProject = projects[projectId];
        require(tempProject.owner == msg.sender, "Not the project owner");
        _;
    }

    modifier onlyVerifier(uint projectId, uint achievementId) {
        Achievement memory achievement = achievements[achievementId];
        require(projectVerifiers[projectId][msg.sender].isVerifier == true, 'You are not the verifier for this project and cannot verify this achievement.');
        _;
    }

     modifier onlyProjectStudent(uint projectId) {
        Project memory project = projects[projectId];
        require(projectStudents[projectId][msg.sender].isStudent == true, 'You are not the student for this project.');
        _;
    }

    function createProject(string memory title, string memory description, uint256 deadlineTimestamp, bool isPublic) public {
        projectCounter++;
        projects[projectCounter] = Project(title, description, deadlineTimestamp, msg.sender, isPublic);
    }

    function getMyProjects() public view returns(Project[] memory) {
        return studentProjects[msg.sender];
    }

    function getProject(uint projectId) public view returns(Project memory) {
        return projects[projectId];
    }
    
    function registerSelfStudent(uint projectId) public {
        Project memory project = projects[projectId];
        require(!project.isPublic, 'You don`t have permission or you must be added by project owner to the whitelist.');
        addStudent(projectId, msg.sender);
    }

    function addStudentToProjectWhitelist(uint projectId, address studentAddress) public onlyOwner(projectId) {
        addStudent(projectId, studentAddress);
    }

    function addVerifierToProject(uint projectId, address verifierAddress) public onlyOwner(projectId) {
        Verifier memory existingVerifier = projectVerifiers[projectId][verifierAddress];
        require(existingVerifier.isVerifier == false, 'Verifier with such address for this project already exists.');

        existingVerifier.isVerifier = true;
        existingVerifier.wallet = verifierAddress;
        projectVerifiers[projectId][verifierAddress] = existingVerifier;
    }

    function setVerified(uint projectId, uint achievementId, bool verifiedStatus) public onlyVerifier(projectId, achievementId) {
        achievements[achievementId].verified = verifiedStatus;
        projectStudentsAchievements[projectId][achievementsStudents[achievementId]] = achievements[achievementId];
    }

    function postAchievement(uint projectId, string memory description) public onlyProjectStudent(projectId) {
        achievementCounter++;
        Achievement memory tempAchievement = Achievement(description, false);
        achievements[achievementCounter] = tempAchievement;
        achievementsStudents[achievementCounter] = msg.sender;
        projectStudentsAchievements[projectId][msg.sender] = tempAchievement;
    }

    function addStudent(uint projectId, address studentAddress) private {

        require(projectStudents[projectId][studentAddress].isStudent == false, 'This student already exists on the project or the project does not exist.');

        Student storage student = students[studentAddress];
        Project storage project = projects[projectId];

        if (student.isStudent == false) {
            student.wallet = studentAddress;
            student.isStudent = true;
            students[studentAddress] = student;
        }

        projectStudents[projectId][studentAddress] = student;
        studentProjects[studentAddress].push(project);
    }
}