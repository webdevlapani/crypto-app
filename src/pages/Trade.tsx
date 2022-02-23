import { Combobox, Transition } from "@headlessui/react";
import {
  ArrowDownIcon,
  CheckIcon,
  SelectorIcon,
} from "@heroicons/react/outline";
import { FC, Fragment, useEffect, useState } from "react";
import useAssets from "../hooks/useAssets";
import useExchangeRate from "../hooks/useExchangeRate";

const Trade: FC = () => {
  const { data: assets } = useAssets();

  const [values, setValues] = useState<{
    firstInput: number;
    secondInput: number;
    from: string;
  }>({ firstInput: 0, secondInput: 0, from: "BTC" });

  const [searchTerm, setSearchTerm] = useState("");

  const { data: exchangeRate } = useExchangeRate(
    values?.from,
    values?.firstInput
  );

  useEffect(() => {
    setValues((oldValues) => ({ ...oldValues, secondInput: exchangeRate }));
  }, [exchangeRate]);

  const filteredAssets =
    searchTerm === ""
      ? assets?.data
      : assets?.data.filter(
          ({ name, symbol }: any) =>
            name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(searchTerm.toLowerCase().replace(/\s+/g, "")) ||
            symbol
              ?.toLowerCase()
              .replace(/\s+/g, "")
              .includes(searchTerm.toLowerCase().replace(/\s+/g, ""))
        );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((oldValues: any) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  const onSelect = (value: string) =>
    setValues((oldValues: any) => ({ ...oldValues, from: value }));

  const onSwap = () => {
    setValues((oldValues: any) => ({
      ...oldValues,
      firstInput: oldValues.secondInput,
      secondInput: oldValues.firstInput,
    }));
  };

  return (
    <div className="flex justify-center items-center flex-col space-y-2 mt-20 shadow-md w-1/4 p-4 rounded-lg m-auto">
      {assets?.data && (
        <div className="border rounded-md w-96 p-2 flex flex-row justify-between">
          <input
            className="outline-none"
            type="number"
            min={1}
            name="firstInput"
            value={values?.firstInput}
            placeholder="0.0"
            onChange={onChange}
          />
          <div>
            <Combobox value={values?.from} onChange={onSelect}>
              <div className="relative mt-1">
                <div className="relative text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-[#ff8215] focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
                  <Combobox.Input
                    className="border-none focus:ring-0 py-2 pl-3 text-sm leading-5 text-gray-900 outline-none"
                    displayValue={(value: string) => value}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 border-0">
                    <SelectorIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredAssets.length === 0 && searchTerm !== "" ? (
                      <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      filteredAssets.map((asset: any) => (
                        <Combobox.Option
                          key={asset.id}
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-white bg-[#ff8215]"
                                : "text-gray-900"
                            }`
                          }
                          value={asset.symbol}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {asset.symbol}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? "text-white" : "text-[#ff8215]"
                                  }`}
                                >
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </div>
        </div>
      )}
      <div
        onClick={onSwap}
        className="bg-[#ff8215] text-white rounded-md p-2 cursor-pointer"
      >
        <ArrowDownIcon height={20} />
      </div>

      <div className="border rounded-md w-96 p-2 flex flex-row justify-between">
        <input
          type="number"
          className="outline-none"
          name="secondInput"
          placeholder="0.0"
          value={values?.secondInput}
          onChange={onChange}
        />
        <div className="bg-[#ff8215] text-white rounded-md p-2">USD</div>
      </div>
    </div>
  );
};

export default Trade;
