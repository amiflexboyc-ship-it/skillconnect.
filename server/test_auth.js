const http = require('http');

// Small script to test auth endpoints directly
const makeRequest = (path, method, data) => {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const req = http.request(
      {
        hostname: 'localhost',
        port: 5000,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve({ statusCode: res.statusCode, body: JSON.parse(body) });
          } catch (e) {
            resolve({ statusCode: res.statusCode, body });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
};

async function runTests() {
  console.log('Testing SkillConnect Auth Flow...');
  const testEmail = `testuser_${Date.now()}@example.com`;
  const testPassword = 'Password123!';

  // 1. Register
  console.log(`\n1. Testing Register with email: ${testEmail}`);
  const regRes = await makeRequest('/api/auth/register', 'POST', {
    name: 'Test Student',
    email: testEmail,
    password: testPassword,
    role: 'freelancer',
  });
  console.log('Register Response:', regRes.statusCode, regRes.body);

  if (!regRes.body.requiresVerification) {
    console.error('FAILED: Register should require verification!');
    process.exit(1);
  }

  let activeCode = regRes.body.devVerificationCode;
  console.log('Got Initial Verification Code:', activeCode);

  // 2. Attempt login BEFORE verification (should be rejected/prompted and new code sent)
  console.log('\n2. Testing Login BEFORE Email Verification (Expect 403 / requiresVerification)');
  const unverifiedLoginRes = await makeRequest('/api/auth/login', 'POST', {
    email: testEmail,
    password: testPassword,
  });
  console.log('Unverified Login Response:', unverifiedLoginRes.statusCode, unverifiedLoginRes.body);

  if (unverifiedLoginRes.statusCode !== 403 || !unverifiedLoginRes.body.requiresVerification) {
    console.error('FAILED: Login before verification should be blocked!');
    process.exit(1);
  }

  // Active code was refreshed during unverified login prompt
  if (unverifiedLoginRes.body.devVerificationCode) {
    activeCode = unverifiedLoginRes.body.devVerificationCode;
    console.log('Updated active code after login prompt:', activeCode);
  }

  // 3. Test invalid verification code
  console.log('\n3. Testing Wrong Verification Code');
  const wrongCodeRes = await makeRequest('/api/auth/verify-code', 'POST', {
    email: testEmail,
    code: '000000',
  });
  console.log('Wrong Code Response:', wrongCodeRes.statusCode, wrongCodeRes.body);

  // 4. Test valid verification code
  console.log('\n4. Testing Valid Verification Code:', activeCode);
  const verifyRes = await makeRequest('/api/auth/verify-code', 'POST', {
    email: testEmail,
    code: activeCode,
  });
  console.log('Verify Response:', verifyRes.statusCode, verifyRes.body);

  if (!verifyRes.body.success || !verifyRes.body.token) {
    console.error('FAILED: Verification should return success and token!');
    process.exit(1);
  }

  // 5. Test login AFTER verification
  console.log('\n5. Testing Login AFTER Email Verification (Expect 200 & success)');
  const verifiedLoginRes = await makeRequest('/api/auth/login', 'POST', {
    email: testEmail,
    password: testPassword,
  });
  console.log('Verified Login Response:', verifiedLoginRes.statusCode, verifiedLoginRes.body);

  if (!verifiedLoginRes.body.success || !verifiedLoginRes.body.token) {
    console.error('FAILED: Login after verification should succeed!');
    process.exit(1);
  }

  console.log('\n🎉 ALL AUTH & EMAIL VERIFICATION TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
}

runTests().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
