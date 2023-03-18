import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
// import metadata from './block.json';
// import save from './save';
// import Edit from './edit';

// registerBlockType( metadata.name, {
// 	edit: Edit,
// 	save,
// } );

const VARIATION_NAME = 'peak-teammembers-query-loop';

registerBlockVariation('core/query', {
  name: VARIATION_NAME,
  scope: ['inserter'],
  title: 'Peak team members Query Loop',
  description: 'A query loop for Peak team members',
  isActive: ['namespace'],
  attributes: {
    className: 'peak-teammembers-query-loop',
    namespace: VARIATION_NAME,
    query: {
      postType: 'teammember',
      perPage: 60, 
      offset: 0
    },
  },
  allowedControls: [],
  innerBlocks: [
    [
      'core/post-template',
      {},
      [['core/post-featured-image'], ['core/post-title'], ['core/post-content']],
    ],
    ['core/query-pagination'],
    ['core/query-no-results'],
  ],
  isActive: ( { namespace, query } ) => {
    return (
        namespace === VARIATION_NAME
        && query.postType === 'teammember'
    );
  },
});

const VARIATION_NAME_2 = 'peak-teammembers-query-loop-home';

registerBlockVariation('core/query', {
  name: VARIATION_NAME_2,
  scope: ['inserter'],
  title: 'Home Peak team members Query Loop',
  description: 'A query loop for Peak team members on the home page',
  attributes: {
    className: 'peak-teammembers-query-loop-home',
    namespace: VARIATION_NAME_2,
    query: {
      postType: 'teammember',
      perPage: 60, 
      offset: 0
    },
  },
  allowedControls: [],
  innerBlocks: [
    [
      'core/post-template',
      {},
      [['core/post-featured-image'], ['core/post-title']],
    ],
    ['core/query-no-results'],
  ],
  isActive: ( { namespace, query } ) => {
    return (
        namespace === VARIATION_NAME_2
        && query.postType === 'teammember'
    );
  },
});

