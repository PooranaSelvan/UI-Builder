import { useDroppable } from '@dnd-kit/core'

const DropZoneItem = ({ position }) => {
     const { setNodeRef, isOver } = useDroppable({
          id: `drop-between-${position}`,
          data: {
               type: "add-between",
               position
          }
     });

     return (
          <div ref={setNodeRef} style={{ height: isOver ? "50px" : "30px", border: isOver ? "2px dashed deepskyblue" : "2px dashed rgba(0, 191, 255, 0.76)", margin: "2px 0", transition: "all 0.3s ease-in-out", display: "flex", flexWrap : "wrap", alignItems: "center", justifyContent: "center", pointerEvents: "auto" }}>
               {isOver && (
                    <h2 style={{fontSize : "14px", fontWeight : "500", color : "deepskyblue"}}>Drop Here !!</h2>
               )}
          </div>
     )
}

export default DropZoneItem;