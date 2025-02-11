// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Student.sol";
import "./Achievement.sol";
import "./Project.sol";
import "./Verifier.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Main is ERC721 {
    
    mapping(address => Student) private students;
    Verifier[] private verifiers;
    Project[] private projects;
    Achievement[] private achievements; 

    mapping(uint => address) private currentProjectMVP;
    mapping(uint => uint) private currentProjectMostAchievementsCount;

    mapping(uint => mapping(address => bool)) private projectVerifierExists; // to check if the verifier for the project exists
    mapping(address => mapping(uint => bool)) private verifierAlreadyVerifiedAchievement; // to check if verifier has already verified the achievement
    mapping(uint => mapping(address => bool)) private projectStudentExists; // to check if student participates the project
    mapping(address => uint) private myParticipatedProjectsCount; // for student
    mapping(address => uint) private myOwnedProjectsCount; // for owner
    mapping(address => uint) private myVerificationProjectsCount; // for verifier
    mapping(address => uint) private myUnverifiedAchievementsCount; // for verifier my unverified achievements
    mapping(address => uint) private myVerifiedAchievementsCount; // for verifier my verified achievements
    mapping(address => uint) private myStudentAchievementsCount; // for student my achievements
    mapping(address => mapping(uint => uint)) myVerifiedStudentAchievementsCountByProject; // for student my verified achievements count for paying out the grant to the winner
    mapping(uint256 => uint) nftsAchievements; // to verify nft achievement

    uint private projectCounter = 0;
    uint private achievementCounter = 0;
    
    uint256 private _nextTokenId;

    constructor() ERC721("", "") { }

    modifier onlyProjectOwner(uint projectId) {
        Project memory tempProject = projects[projectId];
        require(tempProject.owner == msg.sender, "Not the project owner");
        _;
    }

    modifier onlyNotProjectOwner(uint projectId, address studentAddress) {
        Project memory tempProject = projects[projectId];
        require(tempProject.owner != studentAddress, "You are the project owner");
        _;
    }

    modifier onlyVerifier(uint projectId) {
        require(projectVerifierExists[projectId][msg.sender] == true, 'You are not the verifier for this project and cannot verify this achievement.');
        _;
    }

    modifier onlyProjectStudent(uint projectId) {
        Project memory project = projects[projectId];
        require(projectStudentExists[projectId][msg.sender] == true, 'You are not the student for this project.');
        _;
    }

    function mintNFT(address student) private {
        _nextTokenId++;
        _safeMint(student, _nextTokenId);
    }

    function createProject(string memory title, string memory description, uint256 deadlineTimestamp, bool isPublic) public {
        Project memory tempProject = Project(projectCounter, title, description, deadlineTimestamp, msg.sender, isPublic, 1);
        projectVerifierExists[projectCounter][msg.sender] = true;
        projects.push(tempProject);
        myOwnedProjectsCount[msg.sender]++;
        projectCounter++;
    }
    
    function registerSelfStudent(uint projectId) public {
        Project memory project = projects[projectId];
        require(project.isPublic, 'You don`t have permission or you must be added by project owner to the whitelist.');
        addStudent(projectId, msg.sender);
    }

    function addStudentToProjectWhitelist(uint projectId, address studentAddress) public onlyProjectOwner(projectId) {
        addStudent(projectId, studentAddress);
    }

    function addVerifierToProject(uint projectId, address verifierAddress) public onlyProjectOwner(projectId) {
        require(projectVerifierExists[projectId][verifierAddress] == false, 'Verifier with such address for this project already exists.');

        verifiers.push(Verifier(verifierAddress, true));

        projects[projectId].requiredVerificationsCount++;

        myVerificationProjectsCount[verifierAddress]++;
        projectVerifierExists[projectId][verifierAddress] = true;
    }

    function verify(uint projectId, uint achievementId) public onlyVerifier(projectId) {
        require(verifierAlreadyVerifiedAchievement[msg.sender][achievementId] == false, 'You have already verified this achievement');
        require(achievements[achievementId].isVerified == false, 'This achievement is already verified.');

        Achievement storage achievement = achievements[achievementId];

        achievement.verifiedCount++;
        myVerifiedAchievementsCount[msg.sender]++;
        myUnverifiedAchievementsCount[msg.sender]--;
        verifierAlreadyVerifiedAchievement[msg.sender][achievementId] = true;

        address currentStudentWallet = achievement.studentWallet;

        if (achievement.verifiedCount == projects[projectId].requiredVerificationsCount) {
            achievement.isVerified = true;
            myVerifiedStudentAchievementsCountByProject[currentStudentWallet][projectId]++;
            mintNFT(currentStudentWallet);
            nftsAchievements[_nextTokenId] = achievementId;
            achievement.nftTokenId = _nextTokenId;
            
            if (myVerifiedStudentAchievementsCountByProject[currentStudentWallet][projectId] > currentProjectMostAchievementsCount[projectId]) {
                currentProjectMVP[projectId] = currentStudentWallet;
                currentProjectMostAchievementsCount[projectId] = myVerifiedStudentAchievementsCountByProject[currentStudentWallet][projectId];
            }
        }
    }

    function postAchievement(uint projectId, string memory description) public onlyProjectStudent(projectId) {

        Verifier memory tempVerifier;
        for (uint i = 0; i < verifiers.length; i++) {
            tempVerifier = verifiers[i];
            if (projectVerifierExists[projectId][tempVerifier.wallet] == true) {
                myUnverifiedAchievementsCount[tempVerifier.wallet]++;
            }
        }

        achievements.push(Achievement(achievementCounter, description, true, msg.sender, projectId, 0, false, 0));
        myStudentAchievementsCount[msg.sender]++;
        achievementCounter++;
    }

    function addStudent(uint projectId, address studentAddress) private onlyNotProjectOwner(projectId, studentAddress) {

        require(projectStudentExists[projectId][studentAddress] == false, 'This student already exists on the project or the project does not exist.');

        if (students[studentAddress].isStudent == false) {
            students[studentAddress] = Student(studentAddress, true);
        }

        projectStudentExists[projectId][studentAddress] = true;
        myParticipatedProjectsCount[studentAddress]++;
    }

    function getAllProjects() public view returns(Project[] memory) {
        return projects;
    }

    function getMyParticipatedProjects() public view returns(Project[] memory) {
        Project[] memory myProjects = new Project[](myParticipatedProjectsCount[msg.sender]);

        uint myProjectId = 0;

        Project memory tempProj;
        for (uint i = 0; i < projects.length; i++) {
            tempProj = projects[i];
            if (projectStudentExists[tempProj.projectId][msg.sender]) {
                myProjects[myProjectId++] = tempProj;
            }
        }

        return myProjects;
    }

    function getMyOwnedProjects() public view returns(Project[] memory) {
        Project[] memory ownedProjects = new Project[](myOwnedProjectsCount[msg.sender]);

        uint myOwnedProjectId = 0;
        Project memory tempProj;
        for (uint i = 0; i < projects.length; i++) { 
            tempProj = projects[i];
            if (tempProj.owner == msg.sender) {
                ownedProjects[myOwnedProjectId++] = tempProj;
            }
        }

        return ownedProjects;
    }

    function getMyVerificationProjects() public view returns(Project[] memory) {
        Project[] memory verificationProjects = new Project[](myVerificationProjectsCount[msg.sender]);

        uint myVerificationProjectId = 0;

        Project memory tempProj;
        for (uint i = 0; i < projects.length; i++) { 
            tempProj = projects[i];
            if (projectVerifierExists[tempProj.projectId][msg.sender] == true) {
                verificationProjects[myVerificationProjectId++] = tempProj;
            }
        }

        return verificationProjects;
    }

    function getUnverifiedAchievementsForVerifier(uint projectId) public onlyVerifier(projectId) view returns(Achievement[] memory) {
        Achievement[] memory unverifiedAchievements = new Achievement[](myUnverifiedAchievementsCount[msg.sender]);

        uint myUnverifiedAchievementId = 0;

        Achievement memory tempAchievement;
        for(uint i = 0; i < achievements.length; i++) {
            tempAchievement = achievements[i];

            if (tempAchievement.projectId == projectId && verifierAlreadyVerifiedAchievement[msg.sender][tempAchievement.achievementId] == false) {
                unverifiedAchievements[myUnverifiedAchievementId++] = tempAchievement;
            }
        }

        return unverifiedAchievements;
    }

    function getVerifiedAchievementsForVerifier(uint projectId) public onlyVerifier(projectId) view returns(Achievement[] memory) {
        Achievement[] memory verifiedAchievements = new Achievement[](myVerifiedAchievementsCount[msg.sender]);
        
        uint myVerifiedAchievementId = 0;

        Achievement memory tempAchievement;
        for(uint i = 0; i < achievements.length; i++) {
            tempAchievement = achievements[i];

            if (tempAchievement.projectId == projectId && verifierAlreadyVerifiedAchievement[msg.sender][tempAchievement.achievementId] == true) {
                verifiedAchievements[myVerifiedAchievementId] = tempAchievement;
            }
        }

        return verifiedAchievements;
    }

    function getAllMyAchievementsForStudent() public view returns(Achievement[] memory) {
        Achievement[] memory myAchievements = new Achievement[](myStudentAchievementsCount[msg.sender]);

        uint myAchievementsId = 0;
        Achievement memory tempAchievement;
        for(uint i = 0; i < achievements.length; i++) {
            tempAchievement = achievements[i];

            if (tempAchievement.studentWallet == msg.sender) {
                myAchievements[myAchievementsId++] = tempAchievement;
            }
        }

        return myAchievements;
    }

    function getAchievementById(uint achievementId) public view returns(Achievement memory) {
        return achievements[achievementId];
    }
}