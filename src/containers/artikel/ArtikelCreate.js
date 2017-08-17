import { connect } from 'react-redux';
import ArtikelCreate from '../../components/artikel/ArtikelCreate';
import { createArtikel } from '../../modules/artikel';

const mapStateToProps = ({ post }) => {
  const { loading, error } = post;

  return { loading, postError: error };
};

export default connect(mapStateToProps, { createArtikel })(ArtikelCreate);
