import _ from 'lodash';
import { connect } from 'react-redux';
import ArtikelList from '../../components/artikel/ArtikelList';
import { getArtikelList } from '../../modules/artikel';

const mapStateToProps = ({ artikel }) => {
  const { loading, error } = artikel;
  const list = _.map(artikel.list, (val, uid) => ({ ...val, uid }));

  return { loading, postError: error, list };
};

export default connect(mapStateToProps, { getArtikelList })(ArtikelList);
