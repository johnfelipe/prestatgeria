{$total} {gt text='Llibres'}
{if $total > 15}
- {gt text='pàgina'}
{section name=items loop=$items}
{$items[items].text}
{/section}
{/if}