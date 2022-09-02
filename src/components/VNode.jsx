import { h } from 'vue';
function VNode(props, { slots, emit, attrs }) {
  return props.node ? props.node(h) : '';
}
export default VNode;
