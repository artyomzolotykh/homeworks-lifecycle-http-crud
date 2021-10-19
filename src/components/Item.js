const Item = props => {

  const {id, content} = props.item;

  const handleRemoveItem = id => {
    props.removeItem(id);
  }

  return (
    <div className="Item">
      <button className="ItemRemove" onClick={() => handleRemoveItem(id)}>x</button>
      <div className="ItemContent">
        {content}
      </div>
    </div>
  )
}

export default Item;