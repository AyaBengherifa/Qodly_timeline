import {
  useSources,
  useEnhancedEditor,
  selectResolver,
  useEnhancedNode,
  useDataLoader,
  unsubscribeFromDatasource,
  EntityProvider,
} from '@ws-ui/webform-editor';
import { Element } from '@ws-ui/craftjs-core';
import cn from 'classnames';
import { FC, useEffect } from 'react';

interface IVerticalTimelineProps extends webforms.ComponentProps {
  icon?: string;
  variant?: string;
}
const VerticalTimeline: FC<IVerticalTimelineProps> = ({
  icon,
  iterator,
  variant,
  style,
  className,
  classNames = [],
}) => {
  const { resolver } = useEnhancedEditor(selectResolver);
  const {
    //linkedNodes,
    connectors: { connect },
  } = useEnhancedNode((node) => {
    return { linkedNodes: node.data.linkedNodes };
  });
  // const [value, setValue] = useState<datasources.IEntity[]>(() => []);

  const {
    sources: { datasource: ds, currentElement: currentDs },
  } = useSources();
  const { entities, fetchIndex } = useDataLoader({
    source: ds,
  });

  useEffect(() => {
    fetchIndex(0);
  }, []);

  useEffect(() => {
    if (!ds) {
      return;
    }

    const cb = () => {
      ds.getValue('length').then((_length) => {
        fetchIndex(0);
      });
    };

    ds.addListener('changed', cb);

    return () => {
      unsubscribeFromDatasource(ds, cb);
    };
  }, [ds, fetchIndex]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div className="flex flex-col items-start">
        {variant == 'value1' &&
          entities.map((item, index) => (
            <div className="flex items-center mb-2 relative" key={item.__KEY}>
              <div className="w-4 h-4 bg-gray-400 rounded-full mr-3 shadow-2xl border- border-gray-200"></div>
              {index !== entities.length - 1 && (
                <line
                  className="w-0.5 h-full bg-gray-400 absolute left-2"
                  style={{
                    top: 'calc(50% + 10px)',
                    height: 'calc(100% + 20px)',
                  }}
                ></line>
              )}
              <div className="text-sm">
                <EntityProvider
                  index={index}
                  selection={ds}
                  current={currentDs?.id}
                  iterator={iterator}
                >
                  <Element
                    id="item"
                    className="h-full w-full"
                    role="item"
                    is={resolver.StyleBox}
                    deletable={false}
                    canvas
                  />
                </EntityProvider>
              </div>
            </div>
          ))}
        {variant == 'value2' &&
          entities.map((item, index) => (
            <div className="flex items-center mb-2 relative" key={item.__KEY}>
              <div className="text-sm mr-2">
                <EntityProvider
                  index={index}
                  selection={ds}
                  current={currentDs?.id}
                  iterator={iterator}
                >
                  <Element
                    id="item1"
                    className="h-full w-full"
                    role="item1"
                    is={resolver.StyleBox}
                    deletable={false}
                    canvas
                  />
                </EntityProvider>
              </div>
              <div className="flex-grow flex justify-center">
                <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center ">
                  <span
                    className={cn(
                      'fa fd-component',
                      'fd-icon',
                      icon,
                      classNames,
                      'w-2 h-2 fill-current text-gray-500 hover:text-gray-700 flex items-center justify-center',
                    )}
                  ></span>
                </div>
                {index !== entities.length - 1 && (
                  <div
                    className="w-0.5 h-full bg-gray-400 absolute  "
                    style={{
                      top: 'calc(50% + 10px)',
                      height: 'calc(100% + 20px)',
                    }}
                  ></div>
                )}
              </div>
              <div className="text-sm">
                <EntityProvider
                  index={index}
                  selection={ds}
                  current={currentDs?.id}
                  iterator={iterator}
                >
                  <Element
                    id="item2"
                    className="h-full w-full"
                    role="item2"
                    is={resolver.StyleBox}
                    deletable={false}
                    canvas
                  />
                </EntityProvider>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VerticalTimeline;
