const splitBar = (total, current, size = 40, line = '▬', slider = '🔘') => {
    if (!total) throw new Error('Total value is either not provided or invalid');
    if (!current && current !== 0) throw new Error('Current value is either not provided or invalid');
    if (isNaN(total)) throw new Error('Total value is not an integer');
    if (isNaN(current)) throw new Error('Current value is not an integer');
    if (isNaN(size)) throw new Error('Size is not an integer');
    if (current > total) {
        const bar = line.repeat(size + 2);
        const percentage = (current / total) * 100;
        return [bar, percentage];
    } else {
        const percentage = current / total;
        const progress = Math.round((size * percentage));
        const emptyProgress = size - progress;
        const progressText = line.repeat(progress).replace(/.$/, slider);
        const emptyProgressText = line.repeat(emptyProgress);
        const bar = progressText + emptyProgressText;
        const calculated = percentage * 100;
        return [bar, calculated];
    }
};

const filledBar = (total, current, size = 40, line = '<:EM:907021910020341771>', slider = '<:FM:907021910041296956>') => {
    if (!total) throw new Error('Total value is either not provided or invalid');
    if (!current && current !== 0) throw new Error('Current value is either not provided or invalid');
    if (isNaN(total)) throw new Error('Total value is not an integer');
    if (isNaN(current)) throw new Error('Current value is not an integer');
    if (isNaN(size)) throw new Error('Size is not an integer');
    if (current > total) {
        const bar = slider.repeat(size + 2);
        const percentage = 100 - ((current / total) * 100);
        return [`<:FRB:907021909688975371>${bar}<:ELE:907021910116818974> - ${percentage}%`];
    } else {
        const percentage = current / total;
        const progress = Math.round((size * percentage));
        const emptyProgress = size - progress;
        const progressText = slider.repeat(progress);
        const emptyProgressText = line.repeat(emptyProgress);
        const bar = progressText + emptyProgressText;
        const calculated = percentage * 100;
        return [`<:FRB:907021909688975371>${bar}<:ELE:907021910116818974> - ${Math.trunc(calculated)}%`];
    }
};

module.exports = {
    splitBar,
    filledBar
};