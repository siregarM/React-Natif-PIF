import { connect } from 'react-redux';
import ArtikelEdit from '../../components/artikel/ArtikelEdit';
import { updateArtikel, deleteArtikel } from '../../modules/artikel';

const mapStateToProps = (state, props) => {
  const { loading, error } = state.artikel;
  const { title, description, uid } = props.artikel;

  return { loading, postError: error, initialValues: { title, description, uid } };
};

export default connect(mapStateToProps, { updateArtikel, deleteArtikel })(ArtikelEdit);
