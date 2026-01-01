const Book = require('../models/Book');

async function getBook(req, res) {
    try {
        if (req.query.limit) {
            const limit = req.query.limit;
            const books = await Book.aggregate([
                { $sample: { size: limit } }
            ]);
            return res.status(200).json({
                success: true,
                data: books
            });

        }
        const filters = req.bookFilters || {};
        const books = await Book.find(filters).populate('course', 'title');
        res.status(200).json({
            success: true,
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

module.exports = { getBook };