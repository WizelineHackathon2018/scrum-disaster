/* global React */

export default class ProgressBar extends React.Component {
  render() {
    const { max, value, over } = this.props;

    const red = { backgroundColor: 'red' };
    const gray = { backgroundColor: 'gray' };
    let colorBar = gray;
    let colorProgress = red;

    if (over) {
      colorBar = red;
      colorProgress = gray;
    }

    return (
      <div className="wrapper">
        <div className="bar" style={{ height: `${max * 10}px`, ...colorBar }} />
        <div className="progress" style={{ height: `${value * 10}px`, ...colorProgress }} />
      </div>
    );
  }
}
