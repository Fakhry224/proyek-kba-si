import { useEffect, useState } from "react";

const CardShippingMethodSales = () => {
  const [shippingMethodSales, setShippingMethodSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch();
      } catch (error) {}
    };
  });

  return <div>CardShippingMethodSales</div>;
};

export default CardShippingMethodSales;
