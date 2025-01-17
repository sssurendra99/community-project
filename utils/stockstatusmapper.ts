
export function stockStatusMapper({productCount}: {productCount: number}) {
    if( productCount === 0)
    {
        return "Out of Stock";
    }else if (productCount <= 10){
        return "Low Stock";
    }else if(productCount >= 10){
        return "In Stock";
    }
}