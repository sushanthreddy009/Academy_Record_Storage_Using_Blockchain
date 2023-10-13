// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AcademicRecordStorage {
    address public owner;
    
    struct AcademicRecord {
        string studentName;
        string course;
        uint256 graduationYear;
        string result;
    }

    mapping(uint256 => AcademicRecord) public academicRecords;
    uint256 public recordCount;

    event RecordAdded(uint256 indexed studentId, string studentName, string course, uint256 graduationYear, string result);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addAcademicRecord(string memory studentName, string memory course, uint256 graduationYear, string memory result) public onlyOwner {
        uint256 studentId = recordCount++;
        academicRecords[studentId] = AcademicRecord(studentName, course, graduationYear, result);
        emit RecordAdded(studentId, studentName, course, graduationYear, result);
    }
}
