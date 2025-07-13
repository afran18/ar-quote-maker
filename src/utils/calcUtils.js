export const calcSqft = (height, width) => {
    const h = parseFloat(height) || 0;
    const w = parseFloat(width) || 0;

    return (h * w).toFixed(2);
}

export const calcTotalSqft = (sqft, quantity) => {
    const s = parseFloat(sqft) || 0;
    const q = parseFloat(quantity) || 1;

    return (s * q).toFixed(2);
}

export const calcAmount = (totalSqft, ratePerSqft) => {
    const ts = parseFloat(totalSqft) || 0;
    const r = parseFloat(ratePerSqft) || 0;

    return (ts * r).toFixed(2);
}