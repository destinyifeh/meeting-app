"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { MouseEventHandler } from "react";
import "../components/style.css";

interface EventTypes {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export const EventModal: React.FC<EventTypes> = ({
  open,
  onOpenChange,
  onClose,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {/* <Dialog.Trigger asChild>
        <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Edit profile
        </button>
      </Dialog.Trigger> */}
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content
          onInteractOutside={(event) => event.preventDefault()}
          className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[623px] w-[300px]  rounded-[12px] lg:w-[1270px] md:w-[700px]  translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
          style={{
            overflowY: "auto", // Make the content scrollable
            maxHeight: "80vh", // Set a maximum height for the dialog
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div style={{ padding: "10px" }}>
            {/* Your scrollable content */}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>{" "}
            <p>deeeee</p>
            <p>More content...</p>
            <p>Even more content...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>Scroll down to see more...</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae aut perspiciatis nostrum ex error harum rem laboriosam
              laudantium, sit illo id nam vero temporibus rerum hic voluptatem
              delectus veritatis! Officia!
            </p>
          </div>

          {/* <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                Save changes
              </button>
            </Dialog.Close>
          </div> */}
          <p>deeeee</p>
          <Dialog.Close asChild>
            <button
              onClick={onClose}
              className="text-black font-bold hover:bg-violet4 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full  focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon color="red" width={40} height={40} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
