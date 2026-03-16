import { useForm } from "react-hook-form";
import { MACHINE_DATA } from "../../api/mock_data";

  const validationRules = {
    werknemer: {
      required: 'Een werknemer moet aangeduid worden.',
    },
    machine: {
      required: 'Een machine moet aangeduid worden.'
    },
    datum: {
      required: 'Er moet een datum gekozen worden.',
      validate: (value) => {
        const today = new Date()
        today.setHours(0,0,0,0);
        const selectedDate = new Date(value);
        return selectedDate >= today || 'Datum mag niet in het verleden liggen';
      }
    },
    starttijd: {
      required: 'Er moet een starttijd gekozen worden.',
      validate: (value) => {
        if (!value) return true; 
        return (value >= "08:00" && value <= "17:00") || 'Starttijd moet tussen 08:00 en 17:00 liggen';
      }
    },
    eindtijd: {
      required: 'Er moet een eindtijd gekozen worden.',
       validate: (value) => {
        if (!value) return true; 
        const starttijd = getValues('starttijd');
        if (value > "17:00") return 'Eindtijd mag niet later dan 17:00 zijn';
        if (starttijd && value < starttijd) return 'Eindtijd mag niet voor starttijd liggen';
        return true;
      }
    },
    specificaties: {
      required: 'Er moeten meer specificaties gegeven worden.'
    }
  }

export default function TaskForm({werknemers, task = EMPTY_TASK}) {
  const machines = MACHINE_DATA;
  const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm({
    mode: 'onBlur',
    defaultValues: {
      werknemer: task?.memberId || '',
      machine: task?.machine,
      datum: task?.startdatum ? task.startdatum.split('T')[0] : '',
      starttijd: task?.startdatum ? task.startdatum.split('T')[1].slice(0,5) : '',
      eindtijd: task?.startdatum && task?.duurtijd
      ? (() => {
          const start = new Date(task.startdatum);
          start.setMinutes(start.getMinutes() + task.duurtijd);
          return start.toTimeString().slice(0,5);
        })()
      : '',
      specificaties: task?.specificaties
    }
  })

  const onSubmit = (values) => {
    if (!isValid) return;
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5  mx-8">
        <div className="flex flex-col gap-1">
          <label htmlFor="werknemer">
            Werknemer
          </label>
          <select className="bg-[#F3F3F5] p-2 rounded-lg"
          data-cy='taakBewerkenWerknemer'
          {...register('werknemer', validationRules.werknemer)}
          >
            {werknemers.map((w) => 
              <option key={w.id} value={w.id}>
                {w.firstName + " " + w.lastName}
              </option>
            )}
          </select>
          {errors.werknemer && <p className="text-red-500 text-sm mt-1">{errors.werknemer.message}</p> }
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="machine">
            Machine
          </label>
          <select className="bg-[#F3F3F5] p-2 rounded-lg"
          {...register('machine', validationRules.machine)}
          >
             {machines.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          {errors.machine && <p className="text-red-500 text-sm mt-1">{errors.machine.message}</p> }
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="datum">
            Datum
          </label>
          <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 bg-white min-w-42.5">
              <input type="date" className="bg-transparent text-sm
            outline-none cursor-pointer min-w-27.5"
            data-cy="taakBewerkenDatum"
            {...register('datum', validationRules.datum)}/>
            {errors.datum && <p className="text-red-500 text-sm mt-1">{errors.datum.message}</p> }
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="starttijd">
            Starttijd
          </label>
          <input
          {...register('starttijd', validationRules.starttijd)}
            type="time"
            className="bg-[#F3F3F5] rounded-lg p-2"
            data-cy="taakBewerkenStarttijd"
          />
          {errors.starttijd && <p className="text-red-500 text-sm mt-1">{errors.starttijd.message}</p> }
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="eindtijd">
            Eindtijd
          </label>
          <input
          {...register('eindtijd', validationRules.eindtijd)}
            type="time"
            className="bg-[#F3F3F5] rounded-lg p-2"
            data-cy="taakBewerkenEindtijd"
          />
          {errors.eindtijd && <p className="text-red-500 text-sm mt-1">{errors.eindtijd.message}</p> }
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="specificaties">
            Specificaties
          </label>
          <textarea
          {...register('specificaties', validationRules.specificaties)}
            data-cy="taakBewerkenSpecificaties"
            className="min-h-25 p-3 border border-[#e4e4e4] rounded-lg text-sm resize-y focus:outline-none"
          />
          {errors.specificaties && <p className="text-red-500 text-sm mt-1">{errors.specificaties.message}</p> }
        </div>
      </div>
      <div className="flex justify-end m-4 mx-8">
        <button 
        type="submit"
        className="cursor-pointer px-4 py-2 bg-[#4863d6] text-white rounded-md text-sm font-medium hover:bg-[#3c52b3] transition-colors">
          Bewerken
        </button>
      </div>
    </form>
  )
}