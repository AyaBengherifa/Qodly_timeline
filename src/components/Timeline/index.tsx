import config, { ITimelineProps } from './Timeline.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Timeline.build';
import Render from './Timeline.render';

const Timeline: T4DComponent<ITimelineProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Timeline.craft = config.craft;
Timeline.info = config.info;
Timeline.defaultProps = config.defaultProps;

export default Timeline;
