
// page 6개 고정
const pageCal = (data, currentPage) => {

    if (data.length === 0) return null;

    const page = (currentPage - 1) * MAXPAGE;
    const post = data.slice( page, (MAXPAGE*currentPage));

    return post;
};

const MAXPAGE = 6;


export default pageCal;
