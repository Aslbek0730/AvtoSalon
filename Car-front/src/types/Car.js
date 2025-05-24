/**
 * @typedef {Object} Car
 * @property {string} id
 * @property {string} name
 * @property {string} [brand]
 * @property {number} price
 * @property {number} [discountPrice]
 * @property {string} image
 * @property {number} year
 * @property {string} [engine]
 * @property {boolean} isInstallmentAvailable
 * @property {string} [color]
 * @property {string} [condition]
 * @property {number} [mileage]
 * @property {string} [description]
 * @property {Object} [installmentDetails]
 * @property {number} installmentDetails.minMonths
 * @property {number} installmentDetails.maxMonths
 * @property {number} installmentDetails.interestRate
 */

/**
 * @typedef {Object} FilterOptions
 * @property {[number, number]} priceRange
 * @property {string[]} brands
 * @property {number[]} years
 * @property {boolean} installmentOnly
 */

export const Car = {};
export const FilterOptions = {}; 