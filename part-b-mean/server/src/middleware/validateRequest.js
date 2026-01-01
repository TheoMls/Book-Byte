const validateBookQuery = (req, res, next) => {

    const { limit, title, publisher, courseId, inStock, maxPublishedYear } = req.query;

    if (limit !== undefined) {
        const parsedLimit = parseInt(limit);
        if (isNaN(parsedLimit) || parsedLimit <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid limit parameter. It must be a positive integer.'
            });
        }
        req.query.limit = parsedLimit;
        // if there is a limit parameter there shouldn't be any filters with the current app design
        // because limit is only used to get random samples on the landing page
        return next();
    }
    const filters = {};

    if (title) filters.title = { $regex: title, $options: 'i' };
    if (publisher) filters.publisher = publisher;
    if (inStock === 'true') filters.stock = { $gt: 0 };
    if (maxPublishedYear) {
        const year = parseInt(maxPublishedYear);
        if (isNaN(year) || year < 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid maxPublishedYear parameter.'
            });
        }
        filters.publishedDate = { $lte: year };
    }
    if (courseId) {
        if (courseId.match(/^[0-9a-fA-F]{24}$/)) {
            filters.course = courseId;
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid Course ID"
            });
        }
    }

    req.bookFilters = filters;
    return next();
}

module.exports = validateBookQuery;