let cart = null;

module.exports = class Cart {

    static save(product) {

        if (cart === null) {
            // Nếu cart là null, thì tạo một giỏ hàng mới (một đối tượng) với hai thuộc tính: 
            //      +  products là một mảng rỗng để chứa các sản phẩm 
            //      +  totalPrice với giá trị ban đầu là 0.
            cart = { products: [], totalPrice: 0 };
        }

        // Sử dụng phương thức findIndex để kiểm tra xem sản phẩm (product) đã tồn tại trong giỏ hàng (cart.products) hay chưa.
        // Hàm callback p => p.id == product.id kiểm tra các phần tử trong mảng cart.products để tìm phần tử có id trùng với product.id
        // existingProductIndex sẽ là chỉ số của sản phẩm nếu tìm thấy hoặc -1 nếu không tìm thấy.

        const existingProductIndex = cart.products.findIndex(p => p.id == product.id); // để kiểm tra sản phẩm có trong giỏ hàng

        if (existingProductIndex >= 0) { // đã tồn tại trong giỏ hàng rồi

            // nếu sản phẩm đã tồn tại, lấy ra sản phẩm đó từ mảng cart.products dựa trên chỉ số existingProductIndex và lưu vào biến existingProduct.
            const exsitingProduct = cart.products[existingProductIndex];

            // Tăng số lượng (quantity) của sản phẩm existingProduct lên 1, tăng số lượng sản phẩm trong giỏ hàng.
            exsitingProduct.qty += 1;

        } else { // không tồn tại  trong giỏ hàng

            // Đặt số lượng (qty) của sản phẩm product là 1, vì đây là lần đầu sản phẩm này được thêm vào giỏ hàng.
            product.qty = 1;
            cart.products.push(product);    // thêm phần từ vào cuối mảng ... tức là sẽ thêm sp đó vào giỏ hàng
        }

        cart.totalPrice += product.price;   // tính  tổng giá trị của tất cả sản phẩm trong giỏ hàng.
    }

    // Phương thức này được sử dụng để trả về thông tin về giỏ hàng (cart).
    static getCart() {
        return cart;    //  chứa thông tin về giỏ hàng
    }

    // Phương thức này được sử dụng để xóa sản phẩm khỏi giỏ hàng dựa trên productId.
    static delete(productId) {

        // Sử dụng phương thức findIndex để tìm chỉ số (index) của sản phẩm trong mảng cart.products mà có id trùng với productId
        // isExisting là chỉ số của sản phẩm nếu tìm thấy hoặc -1 nếu không tìm thấy.
        const isExisting = cart.products.findIndex(p => p.id == productId);

        if (isExisting >= 0) {  // sản phẩm đã tồn tại trong giỏ hàng

            // Lấy ra sản phẩm (deletedProduct) từ mảng cart.products dựa trên chỉ số isExisting, tức là sản phẩm sẽ bị xóa.
            const deletedProduct = cart.products[isExisting];

            // Giảm tổng giá trị (totalPrice) của giỏ hàng bằng giá trị của sản phẩm (deletedProduct.price) nhân với số lượng sản phẩm (deletedProduct.qty)
            // cập nhật tổng giá trị sau khi sản phẩm bị xóa khỏi giỏ hàng.
            cart.totalPrice -= deletedProduct.price * deletedProduct.qty;

            // splice để xóa sản phẩm khỏi mảng cart.products
            // isExisting là chỉ số của sản phẩm cần xóa, và 1 là số lượng phần tử bạn muốn xóa
            cart.products.splice(isExisting, 1);
        }
    }

}
