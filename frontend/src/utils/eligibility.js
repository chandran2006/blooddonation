export const checkDonationEligibility = (lastDonationDate) => {
  if (!lastDonationDate) return { eligible: true, daysRemaining: 0 };
  
  const lastDate = new Date(lastDonationDate);
  const today = new Date();
  const daysSinceLastDonation = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
  
  const eligible = daysSinceLastDonation >= 90;
  const daysRemaining = eligible ? 0 : 90 - daysSinceLastDonation;
  
  return { eligible, daysRemaining, daysSinceLastDonation };
};

export const getNextEligibleDate = (lastDonationDate) => {
  if (!lastDonationDate) return null;
  
  const lastDate = new Date(lastDonationDate);
  const nextDate = new Date(lastDate);
  nextDate.setDate(nextDate.getDate() + 90);
  
  return nextDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
