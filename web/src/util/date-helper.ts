// src/util/date-helper.ts

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

// ✨ Configura plugins do dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);

/**
 * ✨ Helper centralizado para manipulação de datas com dayjs
 * Sempre trabalha com o timezone configurado
 */
class DateHelper {
  private timezone = 'America/Sao_Paulo';

  /**
   * Obtém data/hora atual no timezone configurado
   */
  now(): dayjs.Dayjs {
    return dayjs().tz(this.timezone);
  }

  /**
   * Formata data para string
   */
  format(
    date: Date | string | dayjs.Dayjs,
    pattern: string = 'YYYY-MM-DD',
  ): string {
    return dayjs(date).tz(this.timezone).format(pattern);
  }

  /**
   * Formata para data (YYYY-MM-DD) - ideal para DATEONLY
   */
  toDateOnly(date?: Date | string | dayjs.Dayjs): string {
    return this.format(date || this.now(), 'YYYY-MM-DD');
  }

  /**
   * Formata para horário (HH:mm)
   */
  toTimeOnly(date?: Date | string | dayjs.Dayjs): string {
    return this.format(date || this.now(), 'HH:mm');
  }

  /**
   * Formata para datetime completo
   */
  toDateTime(date?: Date | string | dayjs.Dayjs): string {
    return this.format(date || this.now(), 'YYYY-MM-DD HH:mm:ss');
  }

  /**
   * Formata para timestamp ISO
   */
  toISO(date?: Date | string | dayjs.Dayjs): string {
    return dayjs(date).toISOString();
  }

  /**
   * Formata para exibição brasileira (dd/MM/yyyy)
   */
  toBrazilian(date: Date | string | dayjs.Dayjs): string {
    return this.format(date, 'DD/MM/YYYY');
  }

  /**
   * Formata datetime para exibição brasileira (dd/MM/yyyy HH:mm)
   */
  toBrazilianDateTime(date: Date | string | dayjs.Dayjs): string {
    return this.format(date, 'DD/MM/YYYY HH:mm');
  }

  /**
   * Parse de string para dayjs (sempre assume timezone configurado)
   */
  parse(dateString: string, format?: string): dayjs.Dayjs {
    return format
      ? dayjs.tz(dateString, format, this.timezone)
      : dayjs.tz(dateString, this.timezone);
  }
  /**
   * Valida se é uma data válida
   */
  isValid(date: any): boolean {
    return dayjs(date).isValid();
  }

  /**
   * Combina data + hora em um dayjs object
   */
  combine(date: string, time: string): dayjs.Dayjs {
    return this.parse(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
  }

  /**
   * Adiciona dias
   */
  addDays(date: Date | string | dayjs.Dayjs, days: number): dayjs.Dayjs {
    return dayjs(date).add(days, 'day');
  }

  /**
   * Adiciona horas
   */
  addHours(date: Date | string | dayjs.Dayjs, hours: number): dayjs.Dayjs {
    return dayjs(date).add(hours, 'hour');
  }

  /**
   * Adiciona minutos
   */
  addMinutes(date: Date | string | dayjs.Dayjs, minutes: number): dayjs.Dayjs {
    return dayjs(date).add(minutes, 'minute');
  }

  /**
   * Subtrai dias
   */
  subtractDays(date: Date | string | dayjs.Dayjs, days: number): dayjs.Dayjs {
    return dayjs(date).subtract(days, 'day');
  }

  /**
   * Início do dia (00:00:00)
   */
  startOfDay(date?: Date | string | dayjs.Dayjs): dayjs.Dayjs {
    return dayjs(date).tz(this.timezone).startOf('day');
  }

  /**
   * Fim do dia (23:59:59)
   */
  endOfDay(date?: Date | string | dayjs.Dayjs): dayjs.Dayjs {
    return dayjs(date).tz(this.timezone).endOf('day');
  }

  /**
   * Início do mês
   */
  startOfMonth(date?: Date | string | dayjs.Dayjs): dayjs.Dayjs {
    return dayjs(date).tz(this.timezone).startOf('month');
  }

  /**
   * Fim do mês
   */
  endOfMonth(date?: Date | string | dayjs.Dayjs): dayjs.Dayjs {
    return dayjs(date).tz(this.timezone).endOf('month');
  }

  /**
   * Verifica se uma data é passado
   */
  isPast(date: Date | string | dayjs.Dayjs): boolean {
    return dayjs(date).isBefore(this.now());
  }

  /**
   * Verifica se uma data é futuro
   */
  isFuture(date: Date | string | dayjs.Dayjs): boolean {
    return dayjs(date).isAfter(this.now());
  }

  /**
   * Verifica se é hoje
   */
  isToday(date: Date | string | dayjs.Dayjs): boolean {
    return dayjs(date).tz(this.timezone).isSame(this.now(), 'day');
  }

  /**
   * Verifica se é antes de outra data
   */
  isBefore(
    date1: Date | string | dayjs.Dayjs,
    date2: Date | string | dayjs.Dayjs,
  ): boolean {
    return dayjs(date1).isBefore(dayjs(date2));
  }

  /**
   * Verifica se é depois de outra data
   */
  isAfter(
    date1: Date | string | dayjs.Dayjs,
    date2: Date | string | dayjs.Dayjs,
  ): boolean {
    return dayjs(date1).isAfter(dayjs(date2));
  }

  /**
   * Diferença em dias entre duas datas
   */
  diffInDays(
    date1: Date | string | dayjs.Dayjs,
    date2: Date | string | dayjs.Dayjs,
  ): number {
    return Math.abs(dayjs(date1).diff(dayjs(date2), 'day'));
  }

  /**
   * Diferença em horas
   */
  diffInHours(
    date1: Date | string | dayjs.Dayjs,
    date2: Date | string | dayjs.Dayjs,
  ): number {
    return Math.abs(dayjs(date1).diff(dayjs(date2), 'hour'));
  }

  /**
   * Diferença em minutos
   */
  diffInMinutes(
    date1: Date | string | dayjs.Dayjs,
    date2: Date | string | dayjs.Dayjs,
  ): number {
    return Math.abs(dayjs(date1).diff(dayjs(date2), 'minute'));
  }

  /**
   * Retorna array de datas entre duas datas
   */
  getDatesBetween(startDate: Date | string, endDate: Date | string): string[] {
    const dates: string[] = [];
    let current = dayjs(startDate);
    const end = dayjs(endDate);

    while (current.isSameOrBefore(end, 'day')) {
      dates.push(this.toDateOnly(current));
      current = current.add(1, 'day');
    }

    return dates;
  }

  /**
   * Retorna o dia da semana (0 = domingo, 6 = sábado)
   */
  getDayOfWeek(date: Date | string | dayjs.Dayjs): number {
    return dayjs(date).day();
  }

  /**
   * Converte para Date nativo (útil para Sequelize)
   */
  toDate(date: Date | string | dayjs.Dayjs): Date {
    return dayjs(date).toDate();
  }
}

export const dateHelper = new DateHelper();

// ✨ Export dayjs configurado (caso precise usar diretamente)
export { dayjs };
