import React from 'react';

const ProductPageSidebar = () => {
    return (
        <main className='bg-slate-200'>
            <section className="w-[246px] transition-[left] ease-linear lg:w-[300px] min-h-[200px] lg:px-2 fixed lg:static h-full top-0 bottom-0 lg:z-0 z-[60] left-[-400px] ">
                <h2 className='text-primary text-lg font-semibold'>Sidebar</h2>
                <p className='text-violet-700 text-xl'>Filter by taka op</p>
            </section>
        </main>
    );
};

export default ProductPageSidebar;
