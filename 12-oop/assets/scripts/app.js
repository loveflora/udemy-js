//=== 클래스 class ===
// 클래스 기반으로 객체 생성

// Blueprint
//] class 생성
class Product {
  //---- 클래스의 field : define properties
  //) 사실 여기에서 필드 정의하는 것은 의미 X
  // title = 'DEFAULT';
  // imageUrl;
  // description;
  // price;

  //] constructor 생성자 함수
  // 객체가 생성되는 되는 과정에서 생성자가 호출됨
  // field나 property나, 나중에 같아짐
  constructor(title, image, desc, price) {
    //---- 클래스의 property(속성)
    this.title = title;
    // this.title : class Product의 프로퍼티
    // title : 파라미터의 title
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }

  //---- 클래스의 Methods
  // prinfInfo() {
  //   console.log();
  // }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

//; 장바구니 class
class ShoppingCart extends Component {
  items = [];

  //] setter
  set cartItems(value) {
    this.items = value;
    // toFixed(2) : 부동 소수점의 부정확함
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2,
    )}</h2>`;
  }

  //] getter
  //) reduce : 단일 값으로 축소
  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0,
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId, false);

    // this.orderProducts : 필드
    // 프로퍼티에서 화살표 함수를 저장
    this.orderProducts = () => {
      console.log("Ordering...");
      console.log(this.items);
    };

    this.render();
  }

  // 추가
  addProduct(product) {
    //) spread operator
    const updatedItems = [...this.items];
    updatedItems.push(product);
    //; set cartItems
    this.cartItems = updatedItems;
  }

  render() {
    // this : ShoppingCart
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;

    const orderButton = cartEl.querySelector("button");

    // 1) 화살표 함수
    // orderButton.addEventListener('click', () => this.orderProducts());
    // 2)
    orderButton.addEventListener("click", this.orderProducts);
    this.totalOutput = cartEl.querySelector("h2");
  }
}

//; 단일상품 class
// 단일 상품 렌더링
class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
    console.log(this.product);
    //  Product { title: "A Pillow", description: "A soft pillow!", imageUrl: "", price: 19.99 }
  }

  //; 렌더링 함수 정의
  render() {
    const prodEl = this.createRootElement("li", "product-item");

    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;

    const addCartButton = prodEl.querySelector("button");

    //_ this
    //_ bind()
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}

//] class 생성
class ProductList extends Component {
  //; # : private
  // 외부에서 사용 불가
  // 클래스 내부에서만 동작
  //) _ : Psudo-Private
  // 표시만 해주고 기술적으로 접근 방지하진 않음
  #products = [];

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    this.#products = [
      //; new 키워드
      // 클래스를 기반으로 한 함수 실행과 함께 인식됨
      // 진짜 함수는 아니지만, 새로운 객체를 생성함

      // class Product {
      //   title = 'DEFAULT';
      //   imageUrl;
      //   description;
      //   price;
      // }
      new Product(
        "A Pillow",
        "https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg",
        "A soft pillow!",
        19.99,
      ),
      new Product(
        "A Carpet",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg",
        "A carpet which you might like - or not.",
        89.99,
      ),
    ];

    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.#products) {
      new ProductItem(prod, "prod-list");
    }
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}

//; Shop 클래스
class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart("app");
    new ProductList("app");
  }
}

//; App 클래스
// 정적 프로퍼티 클래스를 활용하여 다른 클래스와 연결
class App {
  // 정적 필드
  static cart;

  static init() {
    const shop = new Shop();
    // new 키워드가 반환하는 것(shop) : 객체 { } 를 참조
    // const shop = { .. };
    //: const { cart } = shop;

    // this : 클래스를 의미 (정적 메서드에서 사용하면 항상 클래스 자체를 의미)
    this.cart = shop.cart;
  }

  // 프록시로 사용하고 있음
  static addProductToCart(product) {
    // this.cart : ShoppingCart에 근거한 인스턴스
    this.cart.addProduct(product);
  }
}

// App 클래스에서 바로 실행
App.init();
