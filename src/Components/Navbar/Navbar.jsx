import { classNames } from '../utils';

const navigation = [{ name: 'Settings', href: '#', current: true }];

export const Navbar = () => {
  return (
    <div className="relative flex h-20 items-center justify-between px-6" style={{ backgroundColor: '#1a192c' }}>
      <div className="flex justify-end space-x-8">
        <div>
          {' '}
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? ' text-white'
                  : 'text-white  hover:bg-opacity-75',
                'rounded-md py-2 px-3 text-sm font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
              style={{ backgroundColor: item.current ? 'rgb(156, 154, 176)' : 'rgb(200, 200, 200)' }} >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
