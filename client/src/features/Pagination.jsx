import React from 'react'

const Pagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div>
            {pages.map((page, index) => {
                return (
                    <button 
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        style={{
                            fontWeight: currentPage === page ? 'bold' : 'normal',
                            backgroundColor: currentPage === page ? '#1976D2' : 'white',
                            color: currentPage === page ? 'white' : 'black',
                            fontSize:'1.1rem',
                            padding:'.5rem 1rem',
                        }}
                    >
                        {page}
                    </button>
                );
            })}
        </div>
    )
}

export default Pagination