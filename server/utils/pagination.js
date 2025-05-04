module.exports = async function getPagination(req, Model, filter = {}, maxLimit = 6) {
    const totalCount = await Model.countDocuments(filter);

    const parsedLimit = parseInt(req.query.limit) || maxLimit;
    const limit = Math.min(Math.max(parsedLimit, 1), maxLimit, totalCount);
  
    const totalPages = Math.ceil(totalCount / limit);
    const parsedPage = parseInt(req.query.page) || 0;
    const page = Math.min(Math.max(parsedPage, 0), totalPages - 1);
  
    const skip = page * limit;
  
    return { limit, skip, page, totalPages , totalCount };
  };
