function Product({ title, price }) { 
return ( 
<div style={{  
border: '1px solid #444',  
padding: '15px',  
margin: '10px',  
borderRadius: '8px', 
backgroundColor: '#f9f9f9' 
}}> 
<h3> {title}</h3> 
<p>Цена: <strong>{price} руб.</strong></p> 
<button onClick={() => alert(`Вы добавили ${title} в корзину!`)}> 
Купить 
</button> 
</div> 
); 
} 
export default Product;