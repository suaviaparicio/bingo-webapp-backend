
function isFullMatch(card, drawnNumberValues) {
    return ['B', 'I', 'N', 'G', 'O'].every(letter => 
        card[letter].every(number => 
            drawnNumberValues.includes(number) || number === 'Free'
        )
    );
}

function isDiagonalMatch(card, drawnNumberValues) {
    const topLeftToBottomRight = [
        card['B'][0], card['I'][1], card['N'][2], card['G'][3], card['O'][4]
    ];

    const topRightToBottomLeft = [
        card['O'][0], card['G'][1], card['N'][2], card['I'][3], card['B'][4]
    ];

    const topLeftToBottomRightMatch = topLeftToBottomRight.every(number => 
        drawnNumberValues.includes(number) || number === 'Free'
    );

    const topRightToBottomLeftMatch = topRightToBottomLeft.every(number => 
        drawnNumberValues.includes(number) || number === 'Free'
    );

    return topLeftToBottomRightMatch || topRightToBottomLeftMatch;
}

function isVerticalMatch(card, drawnNumberValues) {
    return ['B', 'I', 'N', 'G', 'O'].some(letter => 
        card[letter].every(number => 
            drawnNumberValues.includes(number) || number === 'Free'
        )
    );
}

function isHorizontalMatch(card, drawnNumberValues) {
    const rows = [0, 1, 2, 3, 4];
    return rows.some(rowIndex => 
        ['B', 'I', 'N', 'G', 'O'].every(letter => 
            drawnNumberValues.includes(card[letter][rowIndex]) || card[letter][rowIndex] === 'Free'
        )
    );
}

function isFourCornersMatch(card, drawnNumberValues) {
    console.log(card);
    console.log(drawnNumberValues);
    const corners = [
        card['B'][0], card['O'][0],
        card['B'][4], card['O'][4]
    ];
    return corners.every(number => drawnNumberValues.includes(number));
    // return corners.every(cornerNumber => drawnNumberValues.some(drawn => drawn.number === cornerNumber));

}

module.exports = {
    isFullMatch,
    isDiagonalMatch,
    isVerticalMatch,
    isHorizontalMatch,
    isFourCornersMatch
};

