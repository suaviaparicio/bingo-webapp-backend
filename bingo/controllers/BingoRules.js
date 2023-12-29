
function isFullMatch(card, drawnNumbers) {
    return ['B', 'I', 'N', 'G', 'O'].every(letter => 
        card[letter].every(number => 
            drawnNumbers.includes(number) || number === 'Free'
        )
    );
}

function isDiagonalMatch(card, drawnNumbers) {
    const topLeftToBottomRight = [
        card['B'][0], card['I'][1], card['N'][2], card['G'][3], card['O'][4]
    ];

    const topRightToBottomLeft = [
        card['O'][0], card['G'][1], card['N'][2], card['I'][3], card['B'][4]
    ];

    const topLeftToBottomRightMatch = topLeftToBottomRight.every(number => 
        drawnNumbers.includes(number) || number === 'Free'
    );

    const topRightToBottomLeftMatch = topRightToBottomLeft.every(number => 
        drawnNumbers.includes(number) || number === 'Free'
    );

    return topLeftToBottomRightMatch || topRightToBottomLeftMatch;
}

function isVerticalMatch(card, drawnNumbers) {
    return ['B', 'I', 'N', 'G', 'O'].some(letter => 
        card[letter].every(number => 
            drawnNumbers.includes(number) || number === 'Free'
        )
    );
}

function isHorizontalMatch(card, drawnNumbers) {
    const rows = [0, 1, 2, 3, 4];
    return rows.some(rowIndex => 
        ['B', 'I', 'N', 'G', 'O'].every(letter => 
            drawnNumbers.includes(card[letter][rowIndex]) || card[letter][rowIndex] === 'Free'
        )
    );
}

function isFourCornersMatch(card, drawnNumbers) {
    const drawnNumberValues = drawnNumbers.map(drawn => drawn.number);
    console.log(card);
    console.log(drawnNumbers);
    const corners = [
        card['B'][0], card['O'][0],
        card['B'][4], card['O'][4]
    ];
    return corners.every(number => drawnNumberValues.includes(number));
    // return corners.every(cornerNumber => drawnNumbers.some(drawn => drawn.number === cornerNumber));

}

module.exports = {
    isFullMatch,
    isDiagonalMatch,
    isVerticalMatch,
    isHorizontalMatch,
    isFourCornersMatch
};

