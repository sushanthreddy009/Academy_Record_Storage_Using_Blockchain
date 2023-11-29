async function addRecord() {
    const studentName = document.getElementById('studentName').value;
    const course = document.getElementById('course').value;
    const graduationYear = document.getElementById('graduationYear').value;
    const result = document.getElementById('result').value;

    // Add academic record via backend API
    // Note: You need to replace 'http://localhost:3000/addRecord' with your actual API endpoint
    const response = await fetch('http://localhost:3000/addRecord', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentName, course, graduationYear, result }),
    });

    const data = await response.json();
    if (data.success) {
        alert(`Academic record added successfully! Transaction Hash: ${data.transactionHash}`);
    } else {
        alert(`Error: ${data.error}`);
    }
}
