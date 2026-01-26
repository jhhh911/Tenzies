export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'whitesmoke'
  }

  return (
    <button className="box" style={styles} onClick={props.hold}>{props.value}</button>
  )
}