import { classNames } from '../utils';

const navigation = [{ name: 'Settings', href: '#', current: true }];

export const Navbar = () => {
  return (
    <div className="relative flex h-20 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25 bg-indigo-900 px-6">
      <div className="flex justify-end space-x-8">
        <div>
          {' '}
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-indigo-700 text-white'
                  : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                'rounded-md py-2 px-3 text-sm font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
