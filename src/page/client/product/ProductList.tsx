import { Button, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import CarouselComponent from "./component/Carousel";

const ProductClientPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <CarouselComponent
        images={[
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsKcLtcDvagrqCxPXwH7LG9Nddg1K83l6tQ&s",
          "https://cdn.thewirecutter.com/wp-content/media/2024/11/runningshoes-2048px-09522.jpg?auto=webp&quality=75&width=1024",
          "https://www.jiomart.com/images/product/original/rvl9cvytva/bruton-trendy-sports-shoes-for-men-blue-product-images-rvl9cvytva-0-202209021254.jpg?im=Resize=(1000,1000)",
          "https://cdn.mart.ps/255014-thickbox_default/adidas-men-s-xplr-path-shoes-black-%D8%AD%D8%B0%D8%A7%D8%A1-%D8%A7%D8%AF%D9%8A%D8%AF%D8%A7%D8%B3-%D8%A7%D9%83%D8%B3-%D8%A8%D9%84%D9%88%D8%B1-%D8%A8%D8%A7%D8%AB-%D9%84%D9%84%D8%B1%D8%AC%D8%A7%D9%84-%D9%84%D9%88%D9%86-%D8%A3%D8%B3%D9%88%D8%AF-%D9%88%D9%86%D8%B9%D9%84-%D8%A7%D8%A8%D9%8A%D8%B6.jpg",
        ]}
      />
      <h1>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, deleniti!
        Laboriosam velit sunt dignissimos blanditiis nihil veritatis hic at
        facilis quis recusandae omnis porro iste, optio natus officiis eligendi
        dolore eaque impedit voluptatem odit aliquid cumque odio debitis
        distinctio. Fugit officia quos dicta sit repudiandae numquam veniam
        doloribus voluptates a voluptatum. Quo sapiente quos eum cumque est cum
        nemo eius earum, aliquam labore commodi ratione. Earum aliquam excepturi
        impedit nesciunt asperiores at architecto! Eveniet minus labore
        doloremque sint, quia perspiciatis autem cupiditate. Obcaecati corporis
        perspiciatis adipisci ratione ea! Totam at officiis consequatur quo sint
        quas delectus atque dolores laborum ipsam. Odit corporis et ratione
        voluptatem error cupiditate, adipisci tempore autem placeat quod
        corrupti illo molestiae sit, dolore praesentium voluptatum fuga
        voluptate soluta incidunt fugit maxime. Consequatur iste rem quam
        tenetur provident ab ex dignissimos deserunt deleniti minus. Inventore
        autem unde expedita repudiandae ducimus modi alias maxime laborum,
        deserunt voluptas officia aliquid cum et voluptate harum quibusdam eius
        molestias asperiores sed, aut dolor exercitationem. Libero cupiditate
        illo vel consequuntur atque cum ducimus esse distinctio asperiores iusto
        labore maxime inventore iste architecto a fugiat magni, perspiciatis
        nam, itaque deserunt amet? Perferendis, itaque quisquam aperiam
        similique nesciunt quidem voluptas fugiat! Repudiandae, veniam
        obcaecati!
      </h1>
    </div>
  );
};

export default ProductClientPage;
