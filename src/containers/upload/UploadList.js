import _ from 'lodash';
import { connect } from 'react-redux';
import UploadList from '../../components/upload/UploadList';

const mapStateToProps = ({ post }) => {
  const { loading, error } = post;
  const list = _.map(post.list, (val, uid) => ({ ...val, uid }));

  return { loading, postError: error, list };
};

export default connect(mapStateToProps)(UploadList);
