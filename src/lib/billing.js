/**
 * Calc total bill
 * @param {number} roomBill
 * @param {Date} date
 * @param {number} term
 * @param {number} headCount
 * @param {boolean} breakfast
 * @param {boolean} earlyCheckIn
 * @param {boolean} sightseeing
 * @param {number} additionalPlanPrice
 * @returns {number} total bill
 */
export function calcTotalBill(
  roomBill,
  date,
  term,
  headCount,
  breakfast,
  earlyCheckIn,
  sightseeing,
  additionalPlanPrice,
) {
  let totalBill = roomBill * headCount * term;
  for (let i = 0; i < term; i++) {
    const restDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    restDate.setDate(restDate.getDate() + i);
    if (restDate.getDay() === 0 || restDate.getDay() === 6) {
      totalBill += roomBill * 0.25 * headCount;
    }
  }

  if (breakfast) {
    totalBill += additionalPlanPrice * headCount * term;
  }
  if (earlyCheckIn) {
    totalBill += additionalPlanPrice * headCount;
  }
  if (sightseeing) {
    totalBill += additionalPlanPrice * headCount;
  }
  return totalBill;
}
