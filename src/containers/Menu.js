import { connect } from 'react-redux';
import Menu from '../components/menu';

const mapStateToProps = ({ auth }) => {
  const { error, loading, user } = auth;

  return { authError: error, loading, user };
};

export default connect(mapStateToProps)(Menu);
