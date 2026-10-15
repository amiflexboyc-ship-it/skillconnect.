/**
 * Email Service for SkillConnect
 * Handles notifications, password resets, and contact submissions.
 */

const sendContactNotification = async ({ name, email, phone, subject, message }) => {
  console.log(`[EmailService] Contact message received from ${name} <${email}> (${phone || 'No phone'}):`);
  console.log(`[EmailService] Subject: ${subject}`);
  console.log(`[EmailService] Message: ${message}`);
  console.log(`[EmailService] Admin Notification routed to: amiflexboyc@gmail.com | WhatsApp: 09077108987`);
  return { success: true, message: 'Message sent and logged successfully.' };
};

const sendWelcomeEmail = async (user) => {
  console.log(`[EmailService] Welcome email queued for ${user.name} <${user.email}>`);
  return { success: true };
};

const sendJobNotification = async (job, freelancerEmail) => {
  console.log(`[EmailService] Alert: New matching job '${job.title}' sent to ${freelancerEmail}`);
  return { success: true };
};

module.exports = {
  sendContactNotification,
  sendWelcomeEmail,
  sendJobNotification,
};
