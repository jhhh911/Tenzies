export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "whitesmoke",
  };

  return (
    <button style={styles} onClick={() => props.func(props.id)}>
      {props.value}
    </button>
  );
}
