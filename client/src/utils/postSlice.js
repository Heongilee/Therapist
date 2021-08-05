
const MAXPAGE = 6;

const postSlice = (posts, currentPage=1) => {


    if (Object.keys(posts).length === 0) return;
    // prev
    const page = (currentPage - 1) * MAXPAGE;
    const post = posts.slice( page, (MAXPAGE*currentPage));

    return post;
};

export default postSlice;