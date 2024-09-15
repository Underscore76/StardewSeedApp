import { useMemo, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { JsonEditor as Editor } from "jsoneditor-react18";
import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true, verbose: true });
import "jsoneditor-react18/es/editor.min.css";
import ace from "brace";
import "brace/mode/json";
import "brace/theme/monokai";
import { schema } from "./JobSchema";
import { classNames } from "../../utils";
import { useNavigation } from "react-router-dom";

const validate = ajv.compile(schema);

type JobConfirmDialogProps = {
  data: object;
  open: boolean;
  onClose: () => void;
  onAccept: (data: JobRequirements) => void;
};
export default function JobConfirmDialog(props: JobConfirmDialogProps) {
  const [valid, setValid] = useState(true);
  const [data, setData] = useState(props.data);
  const navigation = useNavigation();

  const onAccept = () => {
    props.onAccept(data as JobRequirements);
  };
  const canSave = useMemo(() => {
    return valid;
  }, [valid]);

  const onChange = (newData: object) => {
    const isValid = validate(newData);
    setValid(isValid);
    setData(newData);
  };
  const onValidationError = (errors: any) => {
    if (errors.length > 0) {
      setValid(false);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} className="relative z-10">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                        Verify Job Configuration
                      </DialogTitle>
                    </div>
                  </div>
                  <div className="relative mt-6 h-full flex-1 px-4 sm:px-6">
                    <Editor
                      value={props.data}
                      onChange={onChange}
                      mode="code"
                      ace={ace}
                      theme="ace/theme/monokai"
                      ajv={ajv}
                      schema={schema}
                      htmlElementProps={{ className: "h-full" }}
                      search={false}
                      // @ts-ignore
                      onValidationError={onValidationError}
                      //@ts-ignore
                      enableTransform={false}
                      enableSort={false}
                    />
                  </div>
                </div>
                <div className="flex flex-shrink-0 justify-end px-4 py-4">
                  <button
                    type="button"
                    onClick={props.onClose}
                    disabled={navigation.state !== "idle"}
                    className={classNames(
                      navigation.state !== "idle" &&
                        "cursor-not-allowed opacity-50",
                      "rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400",
                    )}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={onAccept}
                    disabled={!canSave || navigation.state !== "idle"}
                    className={classNames(
                      canSave
                        ? "bg-indigo-600 hover:bg-indigo-500"
                        : "cursor-not-allowed bg-indigo-600 opacity-50",
                      navigation.state !== "idle" &&
                        "cursor-not-allowed opacity-50",
                      "ml-4 inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
                    )}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );

  // return (
  //   <Dialog
  //     open={props.open}
  //     onClose={() => props.onClose()}
  //     className="relative z-10"
  //   >
  //     <DialogBackdrop
  //       transition
  //       className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
  //     />

  //     <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
  //       <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
  //         <DialogPanel
  //           transition
  //           className="relative h-[80vh] transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
  //         >
  //           <div></div>
  //           <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
  //             <button
  //               type="button"
  //               onClick={props.onAccept}
  //               className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:col-start-2"
  //             >
  //               Deactivate
  //             </button>
  //             <button
  //               type="button"
  //               data-autofocus
  //               onClick={props.onClose}
  //               className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
  //             >
  //               Cancel
  //             </button>
  //           </div>
  //         </DialogPanel>
  //       </div>
  //     </div>
  //   </Dialog>
  // );
}
