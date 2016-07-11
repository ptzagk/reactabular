The following example implements a formatter that provides handles for altering column widths.

Note that the current implementation doesn't constrain the total width of the table. That would require additional logic as you would have to check for this while altering a column width.

```jsx
/*
import React from 'react';
import { Table } from 'reactabular';
*/

class ResizableColumnsTable extends React.Component {
  constructor(props) {
    super(props);

    const resizable = resizableColumn({
      getWidth: column => column.props.style.width,
      onDrag: (width, { columnIndex }) => {
        const columns = this.state.columns;
        const column = columns[columnIndex];

        column.props.style = {
          ...column.props.style,
          width
        };

        this.setState({ columns });
      }
    });

    this.state = {
      columns: [
        {
          props: {
            style: {
              width: 200
            }
          },
          header: {
            label: 'Name',
            format: resizable
          },
          cell: {
            property: 'name'
          }
        },
        {
          props: {
            style: {
              width: 300
            }
          },
          header: {
            label: 'Really Long Address Header',
            format: resizable
          },
          cell: {
            property: 'address'
          }
        },
        {
          props: {
            style: {
              minWidth: 100,
              width: '100%'
            }
          },
          header: {
            label: 'Age'
          },
          cell: {
            property: 'age'
          }
        }
      ],
      data: [
        {
          id: 1,
          name: 'This is a very long title that goes on and on',
          address: '85 Peachfield Road',
          age: 55
        },
        {
          id: 2,
          name: 'Here is a shorter one',
          address: '77 Newmarket Road',
          age: 42
        }
      ]
    };
  }
  render() {
    const { data, columns } = this.state;

    return (
      <Table.Provider
        columns={columns}
        data={data}
        rowKey="id"
        style={{ width: 'auto' }}
      >
        <Table.Header />

        <Table.Body />
      </Table.Provider>
    );
  }
}

// Adapted from https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable
const resizableColumn = (
  {
    getWidth,
    onDrag,
    handleWidth = 5,
    minWidth = 100
  }
) => (label, extraParameters) => {
  class ResizableColumn extends React.Component {
    constructor(props) {
      super(props);

      // Track coordinate data at instance, no React state needed
      this.startX = null;
      this.startWidth = null;

      this.onMouseDown = this.onMouseDown.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
    }
    render() {
      const width = getWidth(extraParameters.column);

      return (
        <div style={{ width }}>
          <div
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: width - handleWidth
            }}
          >{label}</div>
          <span
            className="resize-handle"
            style={{
              backgroundColor: '#aaa',
              cursor: 'col-resize',
              float: 'right',
              width: handleWidth
            }}
            onMouseDown={this.onMouseDown}
          >&nbsp;</span>
        </div>
      );
    }
    onMouseDown(e) {
      e.stopPropagation();
      e.preventDefault();

      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);

      this.startX = e.clientX;
      this.startWidth = getWidth(extraParameters.column);
    }
    onMouseMove(e) {
      e.stopPropagation();
      e.preventDefault();

      const offset = this.startX - e.clientX;

      onDrag(
        Math.max(this.startWidth - offset, minWidth),
        extraParameters
      );
    }
    onMouseUp(e) {
      e.stopPropagation();
      e.preventDefault();

      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  return React.createElement(ResizableColumn);
};

<ResizableColumnsTable />
```