import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Title from './subcomponents/Title';
import ImageSlider from './subcomponents/ImageSlider';
import QuantityInput from '../../components/QuantityInput/QuantityInput';
import updateProductToCart from '../../utils/updateProductToCart';
import { Product } from '../../types';
import './ProductDetails.css';

function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3333/produto/${slug}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      updateProductToCart(product, selectedQuantity);
      navigate('/cart', { state: { price: getTotalPrice() } });
    }
  };

  const getTotalPrice = () => {
    if (product) {
      return (product.price * selectedQuantity).toFixed(2);
    }
    return '0.00';
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, description, images } = product;

  return (
    <main className="product-details-page">
      <Title />
      <ImageSlider images={images} />
      <h3>{name}</h3>
      <p className="fs-3 fw-semibold" style={{ color: '#873143' }}>
        Preço: R$ {getTotalPrice()}
      </p>
      <p>{description}</p>
      <div>
        <span className="fw-semibold">Quantidade:</span>
        <QuantityInput
          quantity={selectedQuantity}
          changeQuantity={setSelectedQuantity}
        />
      </div>
      <Button
        variant="primary"
        style={{ backgroundColor: '#E1C35D' }}
        className="w-100 mt-4 border-0 text-dark"
        onClick={handleAddToCart}
      >
        Comprar
      </Button>
      <Button
        variant="secondary"
        className="w-100 mt-3 mb-3 border-0"
        style={{ backgroundColor: '#873143' }}
        onClick={handleAddToCart}
      >
        Adicionar ao Carrinho
      </Button>
    </main>
  );
}

export default ProductDetails;
